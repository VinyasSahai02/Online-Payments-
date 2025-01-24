import React, { useEffect,useState } from 'react'
import { GetUserInfo } from '../../apicalls/users'
import { message } from 'antd'

function Home() {
  const [userData, setUserData] = useState(null)
  const getData = async () => {
    try {
      const response = await GetUserInfo()
      if(response.success) {
        setUserData(response.data)
      }
    } catch (error) {
      message.error(error.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home