import axios from 'axios'
import React, {useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

import generateString from '../utils/randomString';
type Props = {}

const CreateCoupon = (props: Props) => {
    const [newCoupon, setNewCoupon] = useState({
        couponCode: '',
        discount: 0,
        inPercentage: false,
        desc: '',
        expiresIn: 1,
        timeFormat: '0'
      })
      
      const createCoupon = async () => {
        console.log(newCoupon)
    
        const { couponCode, discount, desc, inPercentage } = newCoupon;
        const expireTimeInHours = getExpireTimeInHours(newCoupon.expiresIn, newCoupon.timeFormat)
        const res = await axios.post("http://localhost:5000/api/coupons/", {
          couponCode, discount, desc, inPercentage, expireTimeInHours
        })
        if (res.status == 245) alert("A coupon with same coupon code already exists, and has not expired yet");
        else if(res.status == 200) alert("The coupon created successfull!")
        console.log(res)
      }
    
      const getExpireTimeInHours = (expiresIn: number, timeFormat: String) => {
        switch (timeFormat) {
          case '0':
            return 1e9
    
          case '1':
            return expiresIn / 60
    
          case '2':
            return expiresIn
    
          case '3':
            return expiresIn * 24
        }
      }

      const generateRandomCouponCode = () => {
        console.log(generateString(6))
        const randomCouponCode = generateString(6)
        setNewCoupon({...newCoupon, couponCode: randomCouponCode})
      }
  return (
    <div>
        <h2>Create a new coupon</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          COUPON CODE
        </InputGroup.Text>
        <Form.Control
          onChange={(e) => setNewCoupon({ ...newCoupon, couponCode: e.target.value })}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />

        <Button variant="success" onClick={generateRandomCouponCode}>RANDOM</Button>{' '}
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          DISCOUNT
        </InputGroup.Text>
        <Form.Control
          onChange={(e) => setNewCoupon({ ...newCoupon, discount: parseInt(e.target.value) })}
          type="number"
          min="1"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <InputGroup.Text id="inputGroup-sizing-default">
          <Form.Check
            onChange={(e) => setNewCoupon({ ...newCoupon, inPercentage: !newCoupon.inPercentage })}
            label="%"
          />
        </InputGroup.Text>
      </InputGroup>

      <FloatingLabel controlId="floatingTextarea2" label="Description">
        <Form.Control
          onChange={(e) => setNewCoupon({ ...newCoupon, desc: e.target.value })}
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>

      <br />
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Expires In
        </InputGroup.Text>
        <Form.Control
          onChange={(e) => setNewCoupon({ ...newCoupon, expiresIn: parseInt(e.target.value) })}
          type="number"
          min="1"
          max="1000"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <Form.Select
          onChange={(e) => setNewCoupon({ ...newCoupon, timeFormat: e.target.value })}
          aria-label="Default select example"
        >
          <option value="0">Never</option>
          <option value="1">Minutes</option>
          <option value="2">Hours</option>
          <option value="3">Days</option>
        </Form.Select>
      </InputGroup>

      <br />
      <Button variant="primary" onClick={createCoupon}>CREATE COUPON</Button>{' '}
      <br /><br />
    </div>
  )
}

export default CreateCoupon