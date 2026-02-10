import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ required: false })
  externalId?: number;

  @Prop({ required: true })
  first_name!: string;

  @Prop({ required: true })
  last_name!: string;

  @Prop({ type: [String], required: false })
  position?: ('G' | 'F' | 'C')[];

  @Prop({ required: false })
  height?: number;

  @Prop({ required: false })
  weight?: number;

  @Prop({ required: false })
  jersey_number?: string;

  @Prop({ required: false })
  college?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ required: false })
  draft_year?: number;

  @Prop({ required: false })
  draft_round?: number;

  @Prop({ required: false })
  draft_number?: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
