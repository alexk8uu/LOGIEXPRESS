import { Response, Request, Router, NextFunction } from 'express';
import { User } from '../models/User';
import { uuid } from 'uuidv4';
import { Carrier } from '../models/Carrier';
import { Vehicle } from '../models/Vehicle';
import { User_Reg } from '../models/User_Reg';


const router = Router()


router.post('/userProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al user profile')
	const { id, identification, zone, photo, account, phone } = req.body

	try {

		let newProfile = {
			id: uuid(),
			identification: identification,
			zone: zone,
			phone: phone,
			photo: photo,
			account: account,
			idUserReg:id
		}
		User.create(newProfile)
			.then((newProfile) => {
				res.send(newProfile);
			})
	} catch (err) {
		next(err)
	}

	// let newProfile = { 
	// 	id: uuid(),
	// 	identification:identification,
	// 	zone:zone,
	// 	phone:phone,
	//     photo:photo,
	//     account:account
	// }



	// User.create(newProfile)
	// .then(newProfile => {
	// 	res.send(newProfile);
	// })
	// .catch(error => next(error))



});

//Eli saco email y phone
router.post('/carrierProfile', async (req: Request, res: Response, next: NextFunction) => {
	// res.send('llega al carrier profile')
	const { id, documentID, license, location, Cuenta,
		brand, patent, model, color, capacity, photo } = req.body
     
	try {

		let idCarrier = uuid()

		let newProfileCarrier = {
			id: idCarrier, 
			documentID: documentID,
			license: license,
			location: location,
			Cuenta: Cuenta,
			photo: photo,
			idUserReg:id
		}
		var newTrack = {
			id: uuid(),
			brand:brand ||null,
			patent: patent||null,
			model :model||null,
			color :color||null,
			capacity: capacity||null,
			CarrierId: idCarrier
		}

		let carrier = await Carrier.create(newProfileCarrier)

		let track = await Vehicle.create(newTrack)

		res.send('Ok')


	} catch (err) {
		next(err)
	}






	// 		}else{
	// 			res.send(`Datos incompletos`)
	// 		}



	// 	}catch(e){

	// 		next(e)
	// 	}

	// }


	// let newProfile = { 
	// 	id: uuid(),
	// 	documentID:documentID,
	// 	license:license,
	// 	email:email,
	// 	phone:phone,
	//     location:location,
	//     CBU:CBU
	// }

	// Carrier.create(newProfile)
	// .then(newProfile => {
	// 	res.send(newProfile);
	// })
	// .catch(error => next(error))
});


//DEBUG
router.get('/profile', async (req: Request, res: Response) => {
	// res.send('llega al  profile')
	const { id } = req.params;

	const user = await User.findByPk(id)

	if (user === null) {
		const carrier = await Carrier.findByPk(id);

		const carrierData =  {
			documentID: carrier?.documentID,
			license: carrier?.license,
			Active: carrier?.Active,
			location: carrier?.location,
			cuenta: carrier?.Cuenta,
			photo: carrier?.photo,
			// travel: carrier?.travel
		}
		
		return carrierData? res.json(carrierData) : res.status(404).send("Carrier Not Found")
	}


	const userData ={
		identification: user.identification,
		zone: user.zone,
		photo: user.photo,
		account: user.account,
	}

	return userData? res.json(userData) : res.status(404).send("User Not Found")

});


//DEBUG
router.put('/edit', async (req: Request, res: Response, next: NextFunction)=>{

	const {id, name, lastName, phone, photo, account, Cuenta, brand, patent, model, color} = req.body;

	
	if (name || lastName || phone ){
		
		const user = await User_Reg.findOne({where:{id}})

		user ? user.update(User_Reg, {where:{
			name: name,
			lastName: lastName,
			phone: phone,
		}}) :
		
		res.status(404).json({msg: "Usuario no encontrado"})
		

	}else if (brand || patent|| model || color){

		const carrier =  await Carrier.findOne({where:{
			userRegId: id,
		}})

		if(carrier){
			const vehicle = await Vehicle.findOne({where:{
				CarrierId: carrier.id,
			}})

			await vehicle?.update(Vehicle, {where:{
				brand: brand,
				patent: patent,
				model: model,
				color: color,
			}})

			return res.status(200).json(vehicle)

		}else{
			res.status(404).json({msg: "transportista no encontrado"})
		}



	}
	
	if(account || photo){
		const userUser = await User.findOne({where:{account}})

		userUser ? userUser.update(User, {where:{
			account: account,
			photo: photo,
		}}):
		res.status(404).json({msg: "Usuario no encontrado"})



	}else if (Cuenta){
		const userCarrier = await User_Reg.findOne({where:{id}})

		userCarrier ? userCarrier.update(Carrier, {where:{
			Cuenta : Cuenta,
		}})

		:
		
		res.status(404).json({msg: "Conductor no encontrado"})

	}

})

router.put('/changepassword', async (req: Request, res: Response, next: NextFunction)=>{

	const { eMail, password } = req.body

	try{
		const userPassword = await User_Reg.findOne({where:{eMail}})

		if(userPassword){
			const updatePassword = await userPassword.update(User_Reg, {where:{password:password}});

			return res.status(200).json(updatePassword)

		}

		return res.status(404).json({msg: "No se pudo actualizar la base de datos"})


	}catch(err){
		next(err)
	}

})

router.put('/capacity', async (req: Request, res: Response, next: NextFunction)=>{

	// const { eMail, capacity } = req.body

	// try{
	// 	const carrier = await Carrier.findOne({where:{eMail}})

	// 	if(carrier && capacity){
	// 		const updateCapacity = await carrier.update(Carrier, {where:{capacity:capacity}});

	// 		return res.status(200).json(updateCapacity)

	// 	}

	// 	return res.status(404).json({msg: "No se pudo actualizar la base de datos"})


	// }catch(err){
	// 	next(err)
	// }

})


router.delete('/delete', async (req: Request, res: Response, next: NextFunction)=>{
	const { id } = req.params;
    try {
        const existsInDBUser = await User.findOne({
            where: {
                id,
            },
        });
        if (existsInDBUser) {
            User.destroy({
                where: {
                    id,
                },
            });
            return res.status(200).send("User has been deleted from database successfully");
        } else if (!existsInDBUser){
			const existsInDBCarrier = await Carrier.findOne({
				where: {
					id,
				},
			})
			existsInDBCarrier ? User.destroy({where:{id,}}) : new Error("ERROR 500: User with given name does not exist in database")
			
		};
    } catch (err) {
        next(err);
    }

})




export default router;