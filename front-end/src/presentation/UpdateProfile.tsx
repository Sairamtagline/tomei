import React from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import updateProfileContainer from '../container/updateProfile'

const UpdateProfile = () => {

    const { formData, formError, handleEdit, handleInputEvent, handleSubmit, imagePreview } = updateProfileContainer()
    return (
        <div className="sign-up">
            <div>
                <h1 className="header py-1 mt-5">UPDATE PROFILE</h1>
                <Form>
                    <Row>
                        <Col md={6}>
                            <img src={imagePreview || formData?.image} alt="profile" className="previewImage my-3" />
                            <input type="file" className="uploadBtn" name="image" onChange={handleInputEvent} />
                            <p className="uploadBtn">Upload</p>
                            <p className="error">{formError.image}</p>
                        </Col>


                        <Col md={6}>
                            <FormGroup className="mt-3 mx-2">
                                <Label className="label text-left">NAME</Label>
                                <Input type="text" onChange={handleInputEvent} name="name" value={formData?.name || ""} />
                                <p className="error">{formError.name}</p>
                            </FormGroup>
                            <FormGroup className="mt-3 mx-2">
                                <Label className="label">EMAIL</Label>
                                <Input type="email" onChange={handleInputEvent} name="email" value={formData?.email || ""} disabled />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col align="right">
                            <Button className="saveBtn my-5 mx-2 px-5" onClick={handleSubmit} >SAVE & NEXT</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default UpdateProfile
