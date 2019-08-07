import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native'
import axios from 'axios'
import FeatherIcons from 'react-native-vector-icons/Feather'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      )

      const { data: dataa2 } = await axios.get(
        'https://uifaces.co/api?limit=10',
        {
          headers: { 'X-API-KEY': '097e83266da919afdea31bc2124cee' }
        }
      )
      for (const [i, user] of data.entries()) {
        user.avatar = dataa2[i].photo
      }
      console.log(data)
      console.log(dataa2)
      setUsers(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const renderUser = user => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
            paddingLeft: 15
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Image
              source={{ uri: user.item.avatar }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                marginRight: 15
              }}
            />

            <View>
              <Text
                style={{ fontSize: 18, fontWeight: '600', marginBottom: 3 }}
              >
                {user.item.name}
              </Text>
              <Text style={{ color: 'rgb(75, 75, 75)' }}>
                {user.item.email}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${user.item.phone}`)}
          >
            <FeatherIcons size={22} name="phone" color="green" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            marginLeft: 15,
            borderColor: 'rgb(242, 242, 242)'
          }}
        />
      </View>
    )
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} size="large" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={user => user.id}
          renderItem={user => renderUser(user)}
        />
      )}
    </View>
  )
}

export default Users
