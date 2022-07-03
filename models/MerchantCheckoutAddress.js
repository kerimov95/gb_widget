'use strict';
module.exports = (sequelize, DataTypes) => {
    const MerchantCheckoutAddress = sequelize.define('MerchantCheckoutAddress', {
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
        checkoutId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "MerchantCheckout",
                key: "uniqueId"
            }
        },
        coinId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        coinName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        amountInCoin: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        amountInUSD: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        isActive: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
        },
        isPaid: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
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
        tableName: 'MerchantCheckoutAddress',
    });
    
    return MerchantCheckoutAddress;
};