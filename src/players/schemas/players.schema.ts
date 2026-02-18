import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PositionEnum } from '../enums/position.enum';
import { Team, TeamSchema } from './teams.schema';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ required: false })
  externalId?: number;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ type: [String], required: false, enum: Object.values(PositionEnum) })
  position?: PositionEnum[];

  @Prop({ required: false })
  height?: number;

  @Prop({ required: false })
  weight?: number;

  @Prop({ required: false })
  jerseyNumber?: string;

  @Prop({ required: false })
  college?: string;

  @Prop({ required: false })
  country?: string;

  @Prop({ required: false })
  draftYear?: number;

  @Prop({ required: false })
  draftRound?: number;

  @Prop({ required: false })
  draftNumber?: number;

  @Prop({ type: TeamSchema, required: false })
  team?: Team;

  @Prop({ default: false })
  isDeleted?: boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
