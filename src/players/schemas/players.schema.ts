import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Team } from './team.schema';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop()
  id: number;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  position: string;

  @Prop()
  height: string;

  @Prop()
  weight: string;

  @Prop()
  jersey_number: string;

  @Prop()
  college: string;

  @Prop()
  country: string;

  @Prop()
  draft_year: number;

  @Prop()
  draft_round: number;

  @Prop()
  draft_number: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  team: Team;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
