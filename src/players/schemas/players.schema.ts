import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Team } from './team.schema';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  height: string;

  @Prop({ required: true })
  weight: string;

  @Prop({ required: true })
  jersey_number: string;

  @Prop({ required: true })
  college: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  draft_year: number;

  @Prop({ required: true })
  draft_round: number;

  @Prop({ required: true })
  draft_number: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  team: Team;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
