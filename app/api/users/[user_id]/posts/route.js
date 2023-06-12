import { connectToDB } from '@utils/database'
import User, { ConvertToObjectId } from '@models/user'

export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        const user_id = new ConvertToObjectId(params.user_id)
        const userData = await User.aggregate([
            {
                $lookup: {
                    from: "prompts",
                    localField: "_id",
                    foreignField: "creator",
                    as: "prompts"
                }
            },
            { $match: { _id: user_id }}
        ])
        return new Response(JSON.stringify(userData), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts for the user", { status: 500 })
    }
}