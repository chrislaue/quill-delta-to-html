"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var value_types_1 = require("./value-types");
var InsertData_1 = require("./InsertData");
var DeltaInsertOp = (function () {
    function DeltaInsertOp(insertVal, attributes) {
        if (!(insertVal instanceof InsertData_1.InsertData)) {
            insertVal = new InsertData_1.InsertData(value_types_1.DataType.Text, insertVal + '');
        }
        this.insert = insertVal;
        this.attributes = attributes || {};
    }
    DeltaInsertOp.createNewLineOp = function () {
        return new DeltaInsertOp(value_types_1.NewLine);
    };
    DeltaInsertOp.prototype.isContainerBlock = function () {
        var attrs = this.attributes;
        return !!(attrs.blockquote || attrs.list || attrs['code-block'] ||
            attrs.header || attrs.align || attrs.direction || attrs.indent);
    };
    DeltaInsertOp.prototype.isBlockquote = function () {
        return this.attributes.blockquote;
    };
    DeltaInsertOp.prototype.isHeader = function () {
        return !!this.attributes.header;
    };
    DeltaInsertOp.prototype.isSameHeaderAs = function (op) {
        return op.attributes.header === this.attributes.header && this.isHeader();
    };
    DeltaInsertOp.prototype.hasSameAdiAs = function (op) {
        return this.attributes.align === op.attributes.align
            && this.attributes.direction === op.attributes.direction
            && this.attributes.indent === op.attributes.indent;
    };
    DeltaInsertOp.prototype.hasSameIndentationAs = function (op) {
        return this.attributes.indent === op.attributes.indent;
    };
    DeltaInsertOp.prototype.hasHigherIndentThan = function (op) {
        return (Number(this.attributes.indent) || 0) > (Number(op.attributes.indent) || 0);
    };
    DeltaInsertOp.prototype.isInline = function () {
        return !(this.isContainerBlock() || this.isVideo());
    };
    DeltaInsertOp.prototype.isCodeBlock = function () {
        return !!this.attributes['code-block'];
    };
    DeltaInsertOp.prototype.isJustNewline = function () {
        return this.insert.value === value_types_1.NewLine;
    };
    DeltaInsertOp.prototype.isList = function () {
        return this.isOrderedList() || this.isBulletList();
    };
    DeltaInsertOp.prototype.isOrderedList = function () {
        return this.attributes.list === value_types_1.ListType.Ordered;
    };
    DeltaInsertOp.prototype.isBulletList = function () {
        return this.attributes.list === value_types_1.ListType.Bullet;
    };
    DeltaInsertOp.prototype.isSameListAs = function (op) {
        return this.attributes.list === op.attributes.list && !!op.attributes.list;
    };
    DeltaInsertOp.prototype.isText = function () {
        return this.insert.type === value_types_1.DataType.Text;
    };
    DeltaInsertOp.prototype.isImage = function () {
        return this.insert.type === value_types_1.DataType.Image;
    };
    DeltaInsertOp.prototype.isFormula = function () {
        return this.insert.type === value_types_1.DataType.Formula;
    };
    DeltaInsertOp.prototype.isVideo = function () {
        return this.insert.type === value_types_1.DataType.Video;
    };
    DeltaInsertOp.prototype.isLink = function () {
        return this.isText() && !!this.attributes.link;
    };
    DeltaInsertOp.prototype.isMentions = function () {
        return this.isText() && !!this.attributes.mentions;
    };
    return DeltaInsertOp;
}());
exports.DeltaInsertOp = DeltaInsertOp;
