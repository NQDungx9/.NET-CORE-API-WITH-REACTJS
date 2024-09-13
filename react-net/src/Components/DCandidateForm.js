import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { useToasts } from "react-toast-notifications";


const styles = theme =>({
    root:{
    '& .MuiTextField-root':{
        margin: theme.spacing(1),
        minWidth: 230,
        }
    },
    formControl:{
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin:{
        margin: theme.spacing(1),
    }
})

const initialFieldValues = {
    fullName : '',
    mobile : '',
    email : '',
    age : '',
    bloodGruop : '',
    address : '',
}

const DCandidateForm = ({classes, ...props}) => {
    

    const {addToast} = useToasts()

    const validate = (fieldValues = values) =>{
        let temp = {...errors}
        if('fullName' in fieldValues) temp.fullName = fieldValues.fullName!=""?"":"This field is required."
        if('mobile' in fieldValues) temp.mobile = fieldValues.mobile!=""?"":"This field is required."
        if('bloodGruop' in fieldValues) temp.bloodGruop = fieldValues.bloodGruop!=""?"":"This field is required."
        if('email' in fieldValues) temp.email = (/^$|.+@.+..+/).test(fieldValues.email)?"":"Email is not valid"
        setErrors({
            ...temp
        })

        if(fieldValues == values) return Object.values(temp).every(x=>x=="")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)


    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() =>{
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);


    const handleSubmit = e =>{
        e.preventDefault()
        if(validate()){
            const onSuccess = () => { resetForm()
                addToast("Submitted Successfully", {appearance:'success'})
            }
            if(props.currentId == 0) props.createDCandidate(values, onSuccess)
                else props.updateDCandidate(props.currentId, values, onSuccess)
        }

        
    }

    useEffect(() =>{
        if(props.currentId != 0)
        {
            setValues({
                ...props.dCandidateList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                    name="fullName"
                    variant="outlined"
                    label="Full Name" 
                    value={values.fullName}
                    onChange={handleInputChange}
                    {...(errors.fullName && {error:true, helperText: errors.fullName})}/>
                    <TextField
                    name="email"
                    variant="outlined"
                    label="Email" 
                    value={values.email}
                    onChange={handleInputChange}
                    {...(errors.email && {error:true, helperText: errors.email})}
                    />

                    <FormControl variant="outlined"
                    className={classes.formControl}
                    {...(errors.bloodGruop && {error:true})}>
                        <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                        <Select 
                        name="bloodGruop"
                        value={values.bloodGruop}
                        onChange={handleInputChange}
                        labelWidth={labelWidth}>
                            <MenuItem value="">Select Blood Group</MenuItem>
                            <MenuItem value="A+">A +</MenuItem>
                            <MenuItem value="A-">A -</MenuItem>
                            <MenuItem value="B+">B +</MenuItem>
                            <MenuItem value="B-">B -</MenuItem>
                            <MenuItem value="AB+">AB +</MenuItem>
                            <MenuItem value="AB-">AB -</MenuItem>
                            <MenuItem value="O+">O +</MenuItem>
                            <MenuItem value="O-">O -</MenuItem>
                        </Select>
                        {errors.bloodGruop && <FormHelperText>{errors.bloodGruop}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    name="mobile"
                    variant="outlined"
                    label="Mobile" 
                    value={values.mobile}
                    onChange={handleInputChange}
                    {...(errors.mobile && {error:true, helperText: errors.mobile})}
                    />
                    <TextField
                    name="age"
                    variant="outlined"
                    label="Age" 
                    value={values.age}
                    onChange={handleInputChange}
                    {...(errors.age && {error:true, helperText: errors.age})}
                    />
                    <TextField
                    name="address"
                    variant="outlined"
                    label="Address" 
                    value={values.address}
                    onChange={handleInputChange}
                    {...(errors.address && {error:true, helperText: errors.address})}
                    />
                    <div>
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                        variant="contained"
                        className={classes.smMargin}
                        onClick ={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = state =>({
    dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
    createDCandidate : actions.create,
    updateDCandidate : actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));