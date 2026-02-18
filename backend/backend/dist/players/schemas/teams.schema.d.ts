export declare class Team {
    id: number;
    conference: string;
    division: string;
    city: string;
    name: string;
    fullName: string;
    abbreviation: string;
}
export declare const TeamSchema: import("mongoose").Schema<Team, import("mongoose").Model<Team, any, any, any, import("mongoose").Document<unknown, any, Team, any, import("mongoose").DefaultSchemaOptions> & Team & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, Team>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<number, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    conference?: import("mongoose").SchemaDefinitionProperty<string, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    division?: import("mongoose").SchemaDefinitionProperty<string, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    city?: import("mongoose").SchemaDefinitionProperty<string, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    fullName?: import("mongoose").SchemaDefinitionProperty<string, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
    abbreviation?: import("mongoose").SchemaDefinitionProperty<string, Team, import("mongoose").Document<unknown, {}, Team, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Team & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> | undefined;
}, Team>;
