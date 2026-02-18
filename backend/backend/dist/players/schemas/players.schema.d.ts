import { HydratedDocument } from 'mongoose';
import { PositionEnum } from '../enums/position.enum';
import { Team } from './teams.schema';
export type PlayerDocument = HydratedDocument<Player>;
export declare class Player {
    externalId?: number;
    firstName: string;
    lastName: string;
    position?: PositionEnum[];
    height?: number;
    weight?: number;
    jerseyNumber?: string;
    college?: string;
    country?: string;
    draftYear?: number;
    draftRound?: number;
    draftNumber?: number;
    team?: Team;
    isDeleted?: boolean;
}
export declare const PlayerSchema: import("mongoose").Schema<Player, import("mongoose").Model<Player, any, any, any, (import("mongoose").Document<unknown, any, Player, any, import("mongoose").DefaultSchemaOptions> & Player & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Player, any, import("mongoose").DefaultSchemaOptions> & Player & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Player>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Player, import("mongoose").Document<unknown, {}, Player, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    externalId?: import("mongoose").SchemaDefinitionProperty<number | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    firstName?: import("mongoose").SchemaDefinitionProperty<string, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    lastName?: import("mongoose").SchemaDefinitionProperty<string, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    position?: import("mongoose").SchemaDefinitionProperty<PositionEnum[] | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    height?: import("mongoose").SchemaDefinitionProperty<number | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    weight?: import("mongoose").SchemaDefinitionProperty<number | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    jerseyNumber?: import("mongoose").SchemaDefinitionProperty<string | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    college?: import("mongoose").SchemaDefinitionProperty<string | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    country?: import("mongoose").SchemaDefinitionProperty<string | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    draftYear?: import("mongoose").SchemaDefinitionProperty<number | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    draftRound?: import("mongoose").SchemaDefinitionProperty<number | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    draftNumber?: import("mongoose").SchemaDefinitionProperty<number | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    team?: import("mongoose").SchemaDefinitionProperty<Team | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDeleted?: import("mongoose").SchemaDefinitionProperty<boolean | undefined, Player, import("mongoose").Document<unknown, {}, Player, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Player>;
