'use strict';
module.exports = (sequelize, DataTypes) => {
    const MerchantKey = sequelize.define('MerchantKey', {
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
        apiKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        labelName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        callbackUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tolerance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        confirmation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hiddenFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        officialFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        agentOneFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        agentTwoFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        globianceHiddenFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        globianceOfficialFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        globianceAgentOneFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        globianceAgentTwoFee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        allowedDomain: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        logo: {
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
        tableName: 'MerchantKey',
    });

    return MerchantKey;
};