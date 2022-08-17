'use strict';
module.exports = (sequelize, DataTypes) => {
    const MerchantFeeDistribution = sequelize.define('MerchantFeeDistribution', {
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
        merchantUserId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "User",
                key: "uniqueId"
            }
        },
        checkoutId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {

                model: "MerchantCheckout",
                key: "uniqueId"
            }
        },
        globianceUserID: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        fromAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        toaddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        blockhash: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transactionID: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currencyName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        typeOfRecord: {
            type: DataTypes.ENUM(['admin', 'merchant', null]),
            allowNull: true,
        },
        UnixTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        GOFP: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        MOFP: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        isGlobiance: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        isMerchant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
        tableName: 'MerchantFeeDistribution',
    });
    MerchantFeeDistribution.associate = function (models) {
        // associations can be defined here
        MerchantFeeDistribution.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'merchantUserId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        });
        MerchantFeeDistribution.belongsTo(models.MerchantCheckout, {
            as: 'MerchantCheckout',
            foreignKey: 'checkoutId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        })
    };
    return MerchantFeeDistribution;
};