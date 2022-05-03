import React, { useEffect, useState } from 'react';
import './App.css';
import { Form, FormControl, InputGroup, Row } from 'react-bootstrap';

enum UnitEnum {
  'imperial' = 'Imperial',
  'metric' = 'Metric'
};

function App() {

  const [unit, setUnit] = useState<UnitEnum>(UnitEnum.imperial);
  const [weight, setWeight] = useState<number>(0.00);
  const [height, setHeight] = useState<number>(0.00);

  const exp = /^[+-]?\d*(?:[.,]\d*)?$/;

  const handleUnit = (evt: UnitEnum) => {
    setUnit(evt);
  }

  const handleWeight = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (exp.test(evt.target.value))
      setWeight(parseFloat(evt.target.value));
    else setWeight(0.00);
  }

  const handleHeight = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (exp.test(evt.target.value))
      setHeight(parseFloat(evt.target.value));
    else setHeight(0.00);
  }

  useEffect(() => {
    if (unit === UnitEnum.imperial) {
      setWeight(weight * 2.20462);
      setHeight(height * 3.28084);
    } else {
      setWeight(weight / 2.20462);
      setHeight(height / 3.28084);
    }
  }, [unit]);

  return (
    <div className="container mt-5">
      <Row className="mb-3">
        <Form.Check
          inline
          label={UnitEnum.imperial}
          name="unit"
          type={'radio'}
          id={`inline-radio-1`}
          checked={unit === UnitEnum.imperial}
          onChange={() => handleUnit(UnitEnum.imperial)}
        />
        <Form.Check
          inline
          label={UnitEnum.metric}
          name="unit"
          type={'radio'}
          id={`inline-radio-2`}
          checked={unit === UnitEnum.metric}
          onChange={() => handleUnit(UnitEnum.metric)}
        />
      </Row>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Weight</InputGroup.Text>
        <FormControl
          aria-label="Weight"
          aria-describedby="inputGroup-sizing-default"
          value={weight}
          type={'number'}
          onChange={handleWeight}
        />
        <InputGroup.Text id="inputGroup-sizing-default">
          {unit === UnitEnum.imperial ? `lbs` : `kg`}
        </InputGroup.Text>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Height</InputGroup.Text>
        <FormControl
          aria-label="Height"
          aria-describedby="inputGroup-sizing-default"
          value={height}
          type="number"
          onChange={handleHeight}
        />
        <InputGroup.Text id="inputGroup-sizing-default">
          {unit === UnitEnum.imperial ? `ft` : `m`}
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}

export default App;
