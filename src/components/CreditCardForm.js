import React, {useEffect, useState} from 'react';
import { Container, TextField, makeStyles, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';
import Message from './Message'
import CreditCardBackComponent from './CreditCardBackComponent'
import CreditCardComponent from './CreditCardComponent'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  root: {
    width: 'auto',
    padding: '175px 25px 50px 25px',
    margin: '10px auto',
    background: 'white',
    borderRadius: '10px',
    height: '250px',
  }
}));

export default function CreditCardForm() {
  const classes = useStyles();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [cvv, setCVV] = useState('');
  const [monthError, setMonthError] = useState('');
  const [yearError, setYearError] = useState('');
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [cvvError, setCVVError] = useState('');
  const [editFront, setEditFront] = useState(true);
  const [cardLogo, setCardLogo] = useState('');

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
    setEditFront(true);
  };

  useEffect(()=>{

    const masterCardRegex = /^5[1-5][0-9]{14}$/;
    const visaCardRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    if(masterCardRegex.test(number)) {
      setCardLogo("masterCardLogo");
      if(cvv.toString().length === 3) {
        setCVVError('');    
      } else {
        setCVVError('Not valid CVV'); 
      }
    } else if (visaCardRegex.test(number)) {
      setCardLogo("visaLogo");
      if(cvv.toString().length === 3) {
        setCVVError('');    
      } else {
        setCVVError('Not valid CVV'); 
      }
    }
    else if (cvv.toString().length === 4){
      setCVVError('');    
    } else {
      setCVVError('Not valid CVV'); 
    }

    if (number.toString().length === 16) {
      setNumberError('');     
    } 

    if(name.length > 0) {
      setNameError(''); 
    } 
    if(month !== '') {
      setMonthError(''); 
    } 
    if(year !== '') {
      setYearError(''); 
    } 
  },[number, cvv, month, year, name])

  const handleSubmit = () => {
    if (number.toString().length < 16) {
      setNumberError('Number length is less than 16!'); 
    } else {
      setNumberError('');
    }
    if(cvv.toString().length < 3) {
      setCVVError('CVV length is less than 3!'); 
    } else {
      setCVVError(''); 
      setEditFront(true);
    }
    if(name.length === 0) {
      setNameError('Name cannot be empty!'); 
    } else {
      setNameError(''); 
    }
    if(month.length === 0) {
      setMonthError('Month cannot be empty!'); 
    } else {
      setMonthError(''); 
    }
    if(year.length === 0) {
      setYearError('Year cannot be empty!'); 
    } else {
      setYearError(''); 
    }
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
    setEditFront(true);
  };

  const handleCardNumberChange = (event) => {
    if (event.target.value.toString().length > 16) {
      return
    }
    setNumber(event.target.value);
    setEditFront(true);
  };

  const handleCardNameChange = (event) => {
    if (event.target.value.toString().length > 30) {
      return
    }
    setName(event.target.value);
    setEditFront(true);
  };

  const handleCVVChange = (event) => {
    if (event.target.value.toString().length > 4) {
      return
    }
    setCVV(event.target.value);
    setEditFront(false);
  };

  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (var i = 0; i < 10; i++) {
    yearOptions.push(<MenuItem key={i} value={currentYear + i}>{currentYear + i}</MenuItem>);
  }

  return (
    <Container className="form-container" maxWidth="sm">
      {numberError && <Message >{numberError}</Message>}
      {cvvError && <Message >{cvvError}</Message>}
      {monthError && <Message >{monthError}</Message>}
      {yearError && <Message >{yearError}</Message>}
      {nameError && <Message >{nameError}</Message>}
      {!editFront? (
      <CreditCardBackComponent cvv={cvv} />
      ):(
        <CreditCardComponent
        name={name}
        number={number}
        month={month}
        year = {year}
        cardLogo={cardLogo}/>
      )
      }
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.formControl}>
                <TextField type="number" onChange={handleCardNumberChange} value={number} id="standard-basic" label="Card Number" /><br/>
                <TextField type="text" onChange={handleCardNameChange} value={name} id="standard-basic" label="Card Name" /><br/>
            </FormControl><br/>
            <FormControl className={classes.formControl}>
                <InputLabel id="month-label">MM</InputLabel>
                <Select
                labelId="month-label"
                id="month-select"
                value={month}
                onChange={handleChangeMonth}
                >
                <MenuItem value={1}>Jan</MenuItem>
                <MenuItem value={2}>Feb</MenuItem>
                <MenuItem value={3}>Mar</MenuItem>
                <MenuItem value={4}>Apr</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>Jun</MenuItem>
                <MenuItem value={7}>Jul</MenuItem>
                <MenuItem value={8}>Aug</MenuItem>
                <MenuItem value={9}>Sep</MenuItem>
                <MenuItem value={10}>Oct</MenuItem>
                <MenuItem value={11}>Nov</MenuItem>
                <MenuItem value={12}>Dec</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="year-label">YYYY</InputLabel>
                <Select
                labelId="year-label"
                id="year-select"
                value={year}
                onChange={handleChangeYear}
                >
                {yearOptions}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField type="number" onChange={handleCVVChange} value={cvv} id="standard-basic" label="CVV" /><br/>
            </FormControl>
            <Button onClick={() => handleSubmit()} variant="contained">Submit</Button>
        </form>
    </Container>
  );
}