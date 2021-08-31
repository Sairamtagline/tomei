import React from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import resetPassword from '../container/resetPassword'

const ResetPassword = () => {

    const { formData, formError, handleInputEvent, handleResetPassword } = resetPassword()

    return (
        <div className="sign-up">
            <div>
                <h1 className="header py-1 mt-5">RESET PASSWORD</h1>
                <Form >
                    <Row sm={2} align="center">
                        <Col align="center">
                            <FormGroup className="mt-3 mx-2" align="center">
                                <Label className="label" >OLD PASSWORD</Label>
                                <Input type="password" name="oldPassword" onChange={handleInputEvent} value={formData.oldPassword} />
                                <p className="error">{formError.oldPassword}</p>
                            </FormGroup>
                            <FormGroup className="mt-3 mx-2">
                                <Label className="label" >NEW PASSWORD</Label>
                                <Input type="password" name="password" onChange={handleInputEvent} value={formData.password} />
                                <p className="error">{formError.password}</p>
                            </FormGroup>
                            <FormGroup className="mt-3 mx-2">
                                <Label className="label">CONFIRM PASSWORD</Label>
                                <Input type="password" name="confirmPassword" onChange={handleInputEvent} value={formData.confirmPassword} />
                                <p className="error">{formError.confirmPassword}</p>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col align="center">
                            <Button className="saveBtn my-5 mx-2 px-5" onClick={handleResetPassword} >Update</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div >
    )
}

export default ResetPassword
