import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Photos extends Document {
    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    contentType: string;

    @Prop({ required: true })
    file: Buffer;
}

export const PhotosSchema = SchemaFactory.createForClass(Photos);