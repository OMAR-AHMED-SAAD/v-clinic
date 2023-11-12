import { Button, message, Dropdown, Menu } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'
import './familyMemberCard.css'
import axiosApi from '../../../utils/axiosApi'
import ConditionalRender from '../../reusable/ConditionalRender/ConditionalRender'

const FamilyMemberCard = ({ member, relation, family, setFamily }) => {
    const handleCancelSubscirption = () => {
        axiosApi
            .post(`/patient/add-package/${member?.id}`, {
                packageID: '-1',
            })
            .then((res) => {
                const updatedFamily = family.map((familyMember) => {
                    if (familyMember._id === familyMember._id) {
                        return { ...familyMember, package: res.data.package }
                    }
                    return familyMember
                })
                setFamily(updatedFamily)
                message.success('Package cancelled successfully')
                console.log(res)
            })
            .catch((err) => {
                message.error('Something went wrong')
                console.log(err)
            })
    }

    return (
        <div className='member-card'>
            <h3>
            {relation}
            </h3>
                
                    <div>
                        <strong>Name: </strong> {member?.name}
                    </div>
                    <div>
                        <strong>Email: </strong> {member?.email}
                    </div>
                    <div>
                        <strong>Phone Number: </strong> {member?.phoneNumber}
                    </div>
                    <div>
                        <strong>Subscribed Package: </strong>{' '}
                        <span>
                            {member?.package?.name ??
                                'Not subscribed to a package'}{' '}
                        </span>
                        <ConditionalRender condition={member?.package != null}>
                            <Dropdown
                                placement='right'
                                overlay={
                                    <Menu>
                                        <Menu.Item>
                                            {
                                                <div className='package-info'>
                                                    <p>
                                                        Price:{' '}
                                                        {member?.package?.price}
                                                    </p>
                                                    <p>
                                                        Session Discount:{' '}
                                                        {
                                                            member?.package
                                                                ?.sessionDiscount
                                                        }
                                                    </p>
                                                    <p>
                                                        Pharmacy Discount:{' '}
                                                        {
                                                            member?.package
                                                                ?.medicineDiscount
                                                        }
                                                    </p>
                                                    <p>
                                                        Family Discount:{' '}
                                                        {
                                                            member?.package
                                                                ?.familySubsDiscount
                                                        }
                                                    </p>
                                                </div>
                                            }
                                        </Menu.Item>
                                    </Menu>
                                }>
                                <InfoCircleFilled />
                            </Dropdown>
                        </ConditionalRender>
                    </div>
                    <div className='edit-buttons'>
                        <Button danger onClick={handleCancelSubscirption}>
                            Cancel Subscription
                        </Button>
                    </div>
        </div>
    )
}

export default FamilyMemberCard
