'use strict';
module.exports = (sequelize, DataTypes) => {
    const MerchantCheckout = sequelize.define('MerchantCheckout', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        uniqueId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "User",
                key: "uniqueId"
            }
        },
        amountInUSD: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        merchantKeys: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "MerchantKey",
                key: "uniqueId"
            }
        },
        merchantPrice: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        paidCoin: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        tolerance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        confirmation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        callbackUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    }, {
        paranoid: true,
        timestamps: true,
        tableName: 'MerchantCheckout',
    });

    return MerchantCheckout;
};