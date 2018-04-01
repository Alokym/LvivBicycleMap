'use strict';

const {Schema} = require('mongoose');

const geoJSONSchema = new Schema(
    {
        any: Schema.Types.GeoJSON,
        point: Schema.Types.Point,
        multipoint: Schema.Types.MultiPoint,
        linestring: Schema.Types.LineString,
        multilinestring: Schema.Types.MultiLineString,
        polygon: Schema.Types.Polygon,
        multipolygon: Schema.Types.MultiPolygon,
        geometry: Schema.Types.Geometry,
        geometrycollection: Schema.Types.GeometryCollection,
        feature: Schema.Types.Feature,
        featurecollection: Schema.Types.FeatureCollection
    }
);

geoJSONSchema.index({'feature.geometry': '2dsphere'});

module.exports = geoJSONSchema;