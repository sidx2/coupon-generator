import React, {useState} from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import axios from 'axios';

type Props = {}

const CheckCoupon = (props: Props) => {
    const [couponInfo, setcouponInfo] = useState({
        isExpired: true,
        discount: '',
        desc: ''
      })
    
      const [checkCouponCode, setCheckCouponCode] = useState('')
    
      const handleClick = async () => {
        const res = await axios.get(`http://localhost:5000/api/coupons/${checkCouponCode}`)
    
        if(res.status == 269) {
          setcouponInfo({
            isExpired: true,
            discount: '0.00',
            desc: 'The Coupon is expired'
          })
        }
    
        else if(res.status == 222) setcouponInfo({
          isExpired: false,
          discount: '0.00',
          desc: 'Invalid Coupon'
        })
    
        else if(res.status == 200) setcouponInfo({
          isExpired: false,
          discount: res.data.coupon.discount,
          desc: res.data.coupon.desc
        })
      }
  return (
    <div>
        <h3>Check the availibility of the coupon</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          COUPON CODE
        </InputGroup.Text>
        <Form.Control
          onChange={(e) => setCheckCouponCode(e.target.value) }
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />

        <Button
        onClick={handleClick}
        > Check
        </Button>
      </InputGroup>

      {couponInfo.isExpired ? 
      <Card body>
      <h4>Coupon is Expired</h4>
      </Card>
      : 
      <Card>
        <Card.Header>{couponInfo.discount} OFF</Card.Header>
        <Card.Body>
            <Card.Text> {couponInfo.desc}</Card.Text>
          </Card.Body>
      </Card>
      }
    </div>
  )
}

export default CheckCoupon