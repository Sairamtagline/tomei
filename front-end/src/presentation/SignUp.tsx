import React from 'react'
import Logo from '../assets/Logo.png'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import signUp from '../container/signUp'

const SignUp = () => {
    const { formData, formError, handleInputEvent, handleSubmit, imagePreview } = signUp()

    const { name, email, image, password, confirmPassword } = formData

    return (
        <div className="sign-up">

            <div>
                <h1 className="header py-1 mt-5">CREATE YOUR ACCOUNT</h1>
                <p className="px-4">Because there will be documents that you need to prepare for the loan, let's start off by creating a password so that you can login to yor account once you have these documents ready. </p>
                <Form>
                    <Row>
                        <Col md={2}>
                            {imagePreview && <img src={imagePreview} alt="profile" className="previewImage my-3" />}
                            <input type="file" className="uploadBtn" name="image" onChange={handleInputEvent} />
                            <p className="uploadBtn">Upload</p>
                            <p className="error">{formError.image}</p>
                        </Col>


                        <Col md={5}>
                            <FormGroup className="mt-3 mx-2">
                                <Label className="label text-left">NAME</Label>
                                <Input type="text" onChange={handleInputEvent} name="name" value={name} />
                                <p className="error">{formError.name}</p>
                            </FormGroup>
                            <FormGroup className="mt-3 mx-2">
                                <Label className="label">EMAIL</Label>
                                <Input type="email" onChange={handleInputEvent} name="email" value={email} />
                                <p className="error">{formError.email}</p>
                            </FormGroup>
                        </Col>

                        <Col md={5}>
                            <FormGroup className="mt-3 mx-2">
                                <Label className="label" >PASSWORD</Label>
                                <Input type="password" onChange={handleInputEvent} name="password" value={password} />
                                <p className="error">{formError.password}</p>
                            </FormGroup>

                            <FormGroup className="mt-3 mx-2">
                                <Label className="label">CONFIRM PASSWORD</Label>
                                <Input type="password" onChange={handleInputEvent} name="confirmPassword" value={confirmPassword} />
                                <p className="error">{formError.confirmPassword}</p>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col align="right">
                            <button className="saveBtn my-3 mx-2 p-3" onClick={handleSubmit} >SAVE & NEXT </button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default SignUp
