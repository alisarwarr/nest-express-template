import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
    @Prop({ required: true, ref: 'User' })
    userId: Types.ObjectId;

    @Prop({ required: true, unique: true })
    text: string;

    @Prop({ default: false })
    isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);