const User = require("../models/User")
const Friend = require("../models/Friend")
const mongoose = require("mongoose")
const { sendRequestFriend, sendAcceptFriend, sendRemoveFriend } = require("./SocketController")

module.exports = {
    get: async (req, res, next) => {
        let user = res.locals.user

        try {
            const friends = await User.findById(user._id).populate({
                path: 'friends',
                populate: [
                    {path: 'recipient', options: {select: ['-friends']}}, 
                    {path: 'requester', options: {select: ['-friends']}}
                ],
                options: {sort: {updatedAt: 'DESC'}}
            })

            if(!!friends)
                return res.json({success: true, friends: friends.friends})
            
            return res.json({success: true, friends: []})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    request: async (req, res, next) => {
        const { nickname } = req.body;
        let user = res.locals.user

        try {        
            let otherUser = await User.findOne({nickname})

            if(!otherUser) {
                const err = {}
                err.param = `all`
                err.msg = `User not found.`
                return res.status(401).json({ success: false, errors: [err] })
            }

            const _id = otherUser._id

            const docA = await Friend.findOneAndUpdate(
                { requester: {_id: user._id}, recipient: {_id: _id} },
                { $set: { status: 1 }},
                { upsert: true, new: true }
            )

            const docB = await Friend.findOneAndUpdate(
                { recipient: {_id: user._id}, requester: {_id: _id} },
                { $set: { status: 2 }},
                { upsert: true, new: true }
            )

            await User.findOneAndUpdate(
                { _id: user._id },
                { $push: { friends: docA._id }}
            )

            await User.findOneAndUpdate(
                { _id },
                { $push: { friends: docB._id }}
            )

            sendRequestFriend({userId: user._id, otherId: _id, status: 2, user})

            return res.json({success: true, user: otherUser})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    accept: async (req, res, next) => {
        const { _id } = req.body;
        let user = res.locals.user

        try {
            await Friend.findOneAndUpdate(
                { requester: {_id: user._id}, recipient: {_id: _id} },
                { $set: { status: 3, updatedAt: new Date() }}
            )
            await Friend.findOneAndUpdate(
                { recipient: {_id: user._id}, requester: {_id: _id} },
                { $set: { status: 3, updatedAt: new Date() }}
            )

            sendAcceptFriend({userId: user._id, otherId: _id, status: 3})

            return res.json({success: true})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
    remove: async (req, res, next) => {
        const { _id } = req.body;
        let user = res.locals.user

        try {
            const friend = await User.aggregate([
                { "$match": { "_id": user._id } },
                { 
                    "$lookup": {
                        "from": Friend.collection.name,
                        "let": { "friends": "$friends" },
                        "pipeline": [
                            { 
                                "$match": {
                                    "recipient": mongoose.Types.ObjectId(_id),
                                    "$expr": { "$in": [ "$_id", "$$friends" ] }
                                }
                            },
                            { "$project": { "status": 1 } }
                        ],
                        "as": "friends"
                    }
                },
                { 
                    "$addFields": {
                        "friendsStatus": {
                            "$ifNull": [ { "$min": "$friends.status" }, 0 ]
                        }
                    }
                }
            ])

            let status = 0
            
            if(friend[0].friendsStatus === 3) {
                await Friend.findOneAndUpdate(
                    { requester: {_id: user._id}, recipient: {_id: _id} },
                    { $set: { status: 2, updatedAt: new Date() }}
                )

                 await Friend.findOneAndUpdate(
                    { recipient: {_id: user._id}, requester: {_id: _id} },
                    { $set: { status: 1, updatedAt: new Date() }}
                )

                status = 2
                
                sendRemoveFriend({userId: user._id, otherId: _id, status: 1})
            } else {
                const docA = await Friend.findOneAndRemove(
                    { requester: {_id: user._id}, recipient: {_id: _id} }
                )

                const docB = await Friend.findOneAndRemove(
                    { recipient: {_id: user._id}, requester: {_id: _id} }
                )

                await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { friends: docA._id }}
                )

                await User.findOneAndUpdate(
                    { _id: _id },
                    { $pull: { friends: docB._id }}
                )

                sendRemoveFriend({userId: user._id, otherId: _id, status: 0})
            }
            
            return res.json({success: true, status})
        } catch (e) {
            console.log(e)
            const err = {}
            err.param = `all`
            err.msg = `Something goes wrong...`
            return res.status(401).json({ success: false, errors: [err] })
        }
    },
}