import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CreditCardComponent from './CreditCardComponent'
import CreditCardBackComponent from './CreditCardBackComponent'


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
    padding: '175px 25px 25px 25px',
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
  const [editFront, setEditFront] = useState(true);

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
    setEditFront(true);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
    setEditFront(true);
  };

  const handleCardNumberChange = (event) => {
    setNumber(event.target.value);
    setEditFront(true);
  };

  const handleCardNameChange = (event) => {
    setName(event.target.value);
    setEditFront(true);
  };

  const handleCVVChange = (event) => {
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
      {!editFront? (
      <CreditCardBackComponent cvv={cvv} />
      ):(
        <CreditCardComponent type="MASTERCARD"
        name={name}
        number={number}
        month={month}
        year = {year}/>
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
                <TextField type="text" onChange={handleCVVChange} value={cvv} id="standard-basic" label="CVV" /><br/>
            </FormControl>
        </form>
    </Container>
  );
}