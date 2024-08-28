const Initiative = require('../models/initiative-model')
const InitiativeMember = require('../models/initiative-member-model')
const { Op } = require('sequelize');


class IntitiativeRepository {

    async createIntitiative(intitiative_data) {
        const createdInitiative = await Initiative.create(intitiative_data);
        return createdInitiative;
    }
    async deleteIntitiative(initiative_id){
        const deletedIntitiative = await Initiative.destroy({where:{initiative_id : initiative_id}});
        return deletedIntitiative;
    }
    
    async findIntitiativeById (initiative_id) {
        const intitiative = await Initiative.findByPk(initiative_id, { raw: true });
        return intitiative;
    }

    async updateIntitiativeMemberCount (initiative_id) {
        const intitiative = await Initiative.findByPk(initiative_id, { raw: true });
        intitiative.no_of_memebers += 1;
        await intitiative.save();
        return intitiative;
    }

    async findAllIntitiatives() {
        const intitiatives = await Initiative.findAll();
        return intitiatives;
    }

    async findAllInitiativeMembers(initiative_id){
        const intitiativeMembers = await Initiative.findAll({ where : {initiative_id : initiative_id} });
        return intitiativeMembers;
    }
    
}

module.exports = IntitiativeRepository