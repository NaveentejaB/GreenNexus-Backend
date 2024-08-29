const IntitiativeService = require("../services/initiative-services")
const bcrypt = require('bcrypt')

class IntitiativeController {
    constructor(){
        this.IntitiativeService =  new IntitiativeService(); 
    }
    async createInitiative(req,res){
        try {
            const {data} = req.body;
            const initiative = await this.IntitiativeService.createInitiative(data);
            res.status(200).json({
                message : `successfully created initiative.`,
                data : initiative,
                error : false
            })
        } catch (error) {
            res.status(400).json({
                message : error.message,
                error : true
            })
        }
    }

    async findInitiatives(req,res){
        try {
            const initiatives = await this.IntitiativeService.getAllInitiatives();
            res.status(200).json({
                message : `successfully created initiative.`,
                data : initiatives,
                error : false
            })
        } catch (error) {
            res.status(400).json({
                message : error.message,
                error : true
            })
        } 
    }

    async deleteInitiative(req,res){
        try {
            const {initiative_id} = req.body;
            const Deletedinitiative = await this.IntitiativeService.deleteInitiative(initiative_id);
            res.status(200).json({
                message : `successfully created initiative.`,
                data : Deletedinitiative,
                error : false
            })
        } catch (error) {
            res.status(400).json({
                message : error.message,
                error : true
            })
        }
    }

    async joinInitiative(req,res){
        try {
            const {initiative_id,id} = req.body;  
            const initiativeMember = await this.IntitiativeService.joinInitiative(initiative_id,id);
            res.status(200).json({
                message : `successfully created initiative.`,
                data : initiativeMember,
                error : false
            })
        } catch (error) {
            res.status(400).json({
                message : error.message,
                error : true
            })
        } 
    }

    async deleteInitiative(req,res){
        try {
            const {initiative_id,id} = req.body;  
            const initiativeMember = await this.IntitiativeService.deleteInitiative(initiative_id,id);
            res.status(200).json({
                message : `successfully created initiative.`,
                data : initiativeMember,
                error : false
            })
        } catch (error) {
            res.status(400).json({
                message : error.message,
                error : true
            })
        } 
    }
    
    async LeaveInitiative(req,res){
        try {
            const {initiative_id,id} = req.body;  
            const leftinitiativeMember = await this.IntitiativeService.leaveInitiative(initiative_id,id);
            res.status(200).json({
                message : `successfully left  initiative.`,
                error : false
            })
        } catch (error) {
            res.status(400).json({
                message : error.message,
                error : true
            })
        } 
    }
}

module.exports = IntitiativeController