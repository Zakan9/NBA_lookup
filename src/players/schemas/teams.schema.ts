import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Team {
  @Prop({ required: true })
  id!: number;

  @Prop({ required: true })
  conference!: string;

  @Prop({ required: true })
  division!: string;

  @Prop({ required: true })
  city!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  full_name!: string;

  @Prop({ required: true })
  abbreviation!: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
