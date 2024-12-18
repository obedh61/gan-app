import { Button, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React, { useContext } from 'react'
import { multiStepContext } from '../StepContext'
import { useField, useFormik, useFormikContext } from 'formik'
import * as yup from 'yup'
import test from '../assets/DDL000109126447.pdf'
import cityCenter from '../assets/Carpetas Padres Kids 1-2CENTRO.pdf'
import german from '../assets/Carpetas Padres Kids 1-2 copia-2_240108_104709_1-2g.pdf'
import germanBaby from '../assets/THE MONTESSORI.pdf'

const FormSchema = yup.object({
    termsAndConditions: yup
      .bool()
      .oneOf([true], 'You need to accept the terms and conditions')
      .required('You need to accept the terms and conditions'),
  });

export default function ThirdStep() {
    // const {setFieldValue} = useFormikContext()
    // const [field, meta] = useField(termsAndConditions)
    const {setStep, submitData, userData, setUserData} = useContext(multiStepContext)
    const formik = useFormik({
        initialValues: {
            termsAndConditions: userData['termsAndConditions'],
        },
        validationSchema: FormSchema,
        validateOnChange:false,
        onSubmit: (values) => {
            console.log(userData['termsAndConditions']);
            setUserData({...userData, "termsAndConditions": values.termsAndConditions, })
          setStep(4)
        },
    })
    // console.log(userData[0].termsAndConditions);
    let contractKids
    const contract = () => {
        if(userData['branch'] == 'City Center') {
            contractKids = cityCenter
        } else if (userData['branch'] == 'German Colony' && userData['age'] == 'less than one year') {
            contractKids = germanBaby
        } else if (userData['branch'] == 'German Colony' && userData['age'] == 'more than one year') {
            contractKids = german
        }
    }
    contract()

  return (
    <div style={{padding:"4px"}}>
        <form onSubmit={formik.handleSubmit}>
            <div style={{ height:"30vh" , border:"1px solid gray", margin:"5px"}}>
                <iframe src={contractKids}  height="100%" />
            </div>
            <a href = {contractKids} target = "_blank">Download Pdf</a>
            <div>
            <FormControl>
            <FormLabel onBlur={formik.handleBlur} error={formik.touched.termsAndConditions && Boolean(formik.errors.termsAndConditions)} >{formik.touched.termsAndConditions && formik.errors.termsAndConditions}</FormLabel>
                <FormGroup
                    
                >
                    <FormControlLabel name="termsAndConditions" id='termsAndConditions' onChange={formik.handleChange} value={formik.values.termsAndConditions || false} control={<Checkbox required />} label="I agree" />
                </FormGroup>
            </FormControl>
            </div>
            <div>
                <Button variant='contained' onClick={()=>setStep(2)} color='secondary'>Back</Button><span> </span>
                <Button type="submit" variant='contained' color='primary'>Next</Button>
            </div>
        </form>
    </div>
  )
}
