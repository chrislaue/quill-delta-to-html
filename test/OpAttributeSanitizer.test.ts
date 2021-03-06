
import 'mocha';
import * as assert from 'assert';

import {OpAttributeSanitizer} from './../src/OpAttributeSanitizer';
import {ListType, AlignType, DirectionType} from './../src/value-types';

describe('OpAttributeSanitizer', function () {

    describe('#IsValidHexColor()', function() {
        it('should return true if hex color is valid', function() {
            assert.ok(OpAttributeSanitizer.IsValidHexColor('#234'));
            assert.ok(OpAttributeSanitizer.IsValidHexColor('#f23'));
            assert.ok(OpAttributeSanitizer.IsValidHexColor('#fFe234'));
            assert.equal(OpAttributeSanitizer.IsValidHexColor('#g34'), false);

            assert.equal(OpAttributeSanitizer.IsValidHexColor('e34'), false);
            assert.equal(OpAttributeSanitizer.IsValidHexColor('123434'), false);
        });
    });

    describe('#IsValidFontName()', function() {
        it('should return true if font name is valid', function() {
            assert.ok(OpAttributeSanitizer.IsValidFontName('gooD-ol times 2'));
            assert.equal(OpAttributeSanitizer.IsValidHexColor('bad"times?'), false);
        });
    });

    describe('#IsValidSize()', function() {
        it('should return true if size is valid', function() {
            assert.ok(OpAttributeSanitizer.IsValidSize('bigfaT-size'));
            assert.equal(OpAttributeSanitizer.IsValidSize('small.sizetimes?'), false);
        });
    });

    describe('#IsValidColorLiteral()', function() {
        it('should return true if color literal is valid', function() {
            assert.ok(OpAttributeSanitizer.IsValidColorLiteral('yellow'));
            assert.ok(OpAttributeSanitizer.IsValidColorLiteral('r'));
            assert.equal(OpAttributeSanitizer.IsValidColorLiteral('#234'), false);
            assert.equal(OpAttributeSanitizer.IsValidColorLiteral('#fFe234'), false);
            assert.equal(OpAttributeSanitizer.IsValidColorLiteral('red1'), false);
            assert.equal(OpAttributeSanitizer.IsValidColorLiteral('red-green'), false);
            assert.equal(OpAttributeSanitizer.IsValidColorLiteral(''), false);
        });
    });

    describe('#sanitize()', function() {

        it('should return empty object', function() {
            [null, 3, undefined, "fd"].forEach((v) => {
                assert.deepEqual(OpAttributeSanitizer.sanitize(<any>v), {});
            });
        });

        var attrs = {
            bold: 'nonboolval',
            color: '#12345H',
            background: '#333',
            font: 'times new roman',
            size: 'x.large',
            link: 'http://<',
            script: 'supper',
            list: ListType.Ordered,
            header: '3',
            indent: 40,
            direction: DirectionType.Rtl,
            align: AlignType.Center
        };
        it('should return sanitized attributes', function() {
            assert.deepEqual(OpAttributeSanitizer.sanitize(<any>attrs), {
                bold: true,
                background: '#333',
                font: 'times new roman',
                link: 'http://',
                list: 'ordered',
                header: 3,
                indent: 30,
                direction: 'rtl',
                align: 'center'
            });

            assert.deepEqual(OpAttributeSanitizer.sanitize({header: 1}), {header: 1});
            assert.deepEqual(OpAttributeSanitizer.sanitize({header: null}), {});
            assert.deepEqual(OpAttributeSanitizer.sanitize({header: 100}), {header: 6});
            assert.deepEqual(OpAttributeSanitizer.sanitize({align: AlignType.Center}),
                {align: "center"});
            assert.deepEqual(OpAttributeSanitizer.sanitize({direction: DirectionType.Rtl}),
                {direction: "rtl"});
            assert.deepEqual(OpAttributeSanitizer.sanitize({indent: 2}),
                {indent: 2});
        });
    });
});
