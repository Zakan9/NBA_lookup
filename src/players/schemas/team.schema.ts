import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop()
  id: number;

  @Prop()
  conference: string;

  @Prop()
  division: string;

  @Prop()
  city: string;

  @Prop()
  name: string;

  @Prop()
  full_name: string;

  @Prop()
  abbreviation: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
