'use strict';
module.exports = (sequelize, DataTypes) => {
    const MerchantPayments = sequelize.define('MerchantPayments', {
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fromAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        txid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: false,
        },
        fee: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: true,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vout: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        confirmations: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        blockhash: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        blockheight: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        blockindex: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        blocktime: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        settlement: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        time: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        timereceived: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        refundID: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "MerchantRefund",
                key: "uniqueId"
            }
        },
        remainingAmount: {
            type: DataTypes.DECIMAL(38, 12),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        statusConfirmation: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        isUnderDispute: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
        action: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: 1,
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
        tableName: 'MerchantPayments',
    });
    MerchantPayments.associate = function (models) {
        // associations can be defined here
        MerchantPayments.belongsTo(models.User, {
            as: 'User',
            foreignKey: 'userId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        });
        MerchantPayments.belongsTo(models.MerchantCheckout, {
            as: 'MerchantCheckout',
            foreignKey: 'checkoutId',
            onDelete: 'CASCADE',
            targetKey: 'uniqueId'
        })
    };
    return MerchantPayments;
};