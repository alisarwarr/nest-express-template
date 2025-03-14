import { Document, Model, PipelineStage } from 'mongoose';

export const paginate = async <T extends Document>(
    model: Model<T>,
    query: Record<string, any> = {},
    page: number = 1,
    limit: number = 10
) => {
    const skip = (page - 1) * limit;
    const totalDocuments = await model.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);

    const list = await model
        .find(query)
        .skip(skip)
        .limit(limit)
        .exec();

    return {
        totalDocuments,
        totalPages,
        totalItems: list.length,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        list
    }
}

export const paginateAggregation = async <T extends Document>(
    model: Model<T>,
    pipeline: PipelineStage[],
    page: number = 1,
    limit: number = 10
) => {
    const skip = (page - 1) * limit;
    const aggregationPipeline: PipelineStage[] = [
        ...pipeline,
        {
            $facet: {
                metadata: [{ $count: "totalDocuments" }],
                data: [{ $skip: skip }, { $limit: limit }]
            }
        }
    ];
    const list = await model.aggregate(aggregationPipeline);
    const metadata = list[0].metadata[0] || { totalDocuments: 0 };
    const totalDocuments = metadata.totalDocuments;
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        totalDocuments,
        totalPages,
        totalItems: list[0].data.length,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        list: list[0].data
    }
}