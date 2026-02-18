"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGreaterThan = IsGreaterThan;
const class_validator_1 = require("class-validator");
function IsGreaterThan(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isGreaterThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    if (value === undefined || relatedValue === undefined) {
                        return true;
                    }
                    return value > relatedValue;
                },
            },
        });
    };
}
//# sourceMappingURL=is-greater-than.validator.js.map