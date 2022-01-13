import { Response, Request, Router } from 'express';
import { User } from '../models/User';
import { uuid } from 'uuidv4';
import { User_Reg } from '../models/User_Reg';

const bcryptjs = require("bcryptjs");

// import bcryptjs from 'bcryptjs'


const router = Router()


router.get('/', (req: Request, res: Response) => {
	res.send('OK');
});

// router.post('/login', async (req: Request, res: Response) => {
// 	const { eMail, password} = req.body

// 	const user = await User_Reg.findOne({where:{eMail:eMail}})

// 	const compare = await bcryptjs.compare(password, user!.password)


// 	if ( user && compare /*bcryptjs.compare(password, user.password, function(err:Error, result:boolean){}) */ ){

// 		const payload = {
// 			eMail,
// 			id: user.id,
// 			role: user.role,
// 			name: user.name,
// 			lastname:user.lastName,
// 			phone:user.phone,
// 		};

// 		res.json({
// 			mensaje: 'Autenticación correcta', payload
// 		});
// 	} else {
// 		res.status(300).json({ mensaje: "Usuario o contraseña incorrectos" })
// 	}
// });
router.post('/login', async (req: Request, res: Response) => {
	const { eMail, password } = req.body

	const user = await User_Reg.findAll({ where: { eMail: eMail } })

	if (user.length > 0) {

		const compare = await bcryptjs.compare(password, user[0].password)

		if (compare) {
			const payload = {
				eMail,
				id: user[0].id,
				role: user[0].role,
				name: user[0].name,
				lastname: user[0].lastName,
				phone: user[0].phone,
			};

			return res.json({
				mensaje: 'Autenticación correcta', payload
			}).status(300);

		} else {
			const payload = {
				eMail,
				id: user[0].id,
				role: user[0].role,
				name: user[0].name,
				lastname: user[0].lastName,
				phone: user[0].phone,
			};
			return res.json({
				payload, mensaje: "Contrasena no coincide"
			}).status(300)
		}


	} else {
		// return res.status(404).json({ mensaje: "Usuario o contraseña incorrectos" })

		const payload = {
			role: 1,
		};
		return res.json({payload, mensaje:"usuario y mail ingresados son invalidos"}).status(301)
	}

	// 	console.log('pass: ',password)


	// 	

	// 	if ( user && compare /*bcryptjs.compare(password, user.password, function(err:Error, result:boolean){}) */ ){

	// const payload = {
	// 	eMail,
	// 	id: user.id,
	// 	role: user.role,
	// 	name: user.name,
	// 	lastname:user.lastName,
	// 	phone:user.phone,
	// };

	// res.json({
	// 	mensaje: 'Autenticación correcta', payload
	// });

});



// router.post('/googleAuthentication', async (req: Request, res: Response) => {


// })


export default router;