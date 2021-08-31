import { Button, Table } from 'reactstrap'
import Logo from '../assets/Logo.png'
import resetPassword from '../container/resetPassword'
import updateProfile from '../container/updateProfile'
import DeleteModal from '../shared/DeleteModal'
import ResetPassword from './ResetPassword'
import SignUp from './SignUp'
import CustomizedSteppers from './Step'
import UpdateProfile from './UpdateProfile'
// import { EditIcon } from '@material-ui/icons'
import { Edit, VpnKey, ThreeDRotation, Delete } from '@material-ui/icons';

const HomePage = () => {
    const { isOpen, formData, allData, handleEdit, cancelClick, deleteClick, handleDelete } = updateProfile()
    const { userData, handleEditPassword } = resetPassword()

    return (
        <div className="sign-up">
            <div className="my-5">
                <img src={Logo} alt="logo" />
            </div>
            <div>
                <CustomizedSteppers />
            </div>
            <div>
                {
                    formData && formData.name ? <UpdateProfile /> : userData ? <ResetPassword /> : <SignUp />
                }
            </div>
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.length > 0 && allData.map((user: any, index: number) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Edit onClick={() => handleEdit(user)} />
                                        <Delete onClick={() => deleteClick(user.id, user.email)} />
                                        <VpnKey onClick={() => handleEditPassword(user)} />
                                    </td>
                                </tr>
                            ))
                        }
                        <DeleteModal isOpen={isOpen} cancelClick={cancelClick} handleDelete={handleDelete} />

                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default HomePage
