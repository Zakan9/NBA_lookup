import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ required: true })
  externalId: number;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: false })
  position: string;

  @Prop({ required: false })
  height: string;

  @Prop({ required: false })
  weight: string;

  @Prop({ required: false })
  jersey_number: string;

  @Prop({ required: false })
  college: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  draft_year: number;

  @Prop({ required: false })
  draft_round: number;

  @Prop({ required: false })
  draft_number: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
