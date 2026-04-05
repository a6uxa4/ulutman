/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { styled } from '@mui/material'
import { green, red, orange } from '@mui/material/colors'
import WaitIcon from '../../../assets/icons/address-icon.svg?react'

export const getAdminTableHeaders = (
   handleOpenWaitingModal,
   columns,
   type,
   setData,
) => {
   return columns.map(column => {
      if (
         (column.accessor && column.accessor === 'status') ||
         column.accessor === 'publishStatus' ||
         column.accessor === 'mailingStatus'
      ) {
         return {
            ...column,
            Cell: ({ cell: { value, row } }) => {
               const userData = row.original

               const openModal = () => {
                  // передаем объект объявления напрямую в handleOpenWaitingModal
                  handleOpenWaitingModal(userData)

                  // если setData нужен для других случаев, оставь его
                  if (type === 'user' && setData) {
                     setData(userData)
                  }
               }

               let color
               let IconComponent = null

               switch (value) {
                  case 'ОДОБРЕН':
                  case 'РЕШЕНО':
                  case 'АКТИВНЫЙ':
                  case 'АКТИВНО':
                  case 'ОТПРАВЛЕНО':
                  case 'ОПЛАЧЕНО':
                     color = green[500]
                     break
                  case 'ЗАБЛОКИРОВАН':
                  case 'ОТКЛОНЕН':
                  case 'НЕАКТИВНО':
                  case 'ОШИБКА':
                  case 'НЕ_ОПЛАЧЕНО':
                     color = red[500]
                     break
                  case 'ОЖИДАЕТ':
                     color = orange[500]
                     IconComponent = WaitIcon
                     break
                  default:
                     color = 'inherit'
               }

               return (
                  <Block>
                     <MiniBlock color={color} onClick={openModal}>
                        {value}
                     </MiniBlock>
                     {IconComponent && <IconComponent />}
                  </Block>
               )
            },
         }
      }

      return column
   })
}

const Block = styled('div')({
   alignItems: 'center',
   justifyContent: 'start',
   gap: '6px',
   width: 'fit-content',
})

const MiniBlock = styled('div')(({ color }) => ({
   height: '29px',
   borderRadius: '4px',
   color: 'white',
   padding: '4px 20px',
   fontSize: '14px',
   fontWeight: '500',
   cursor: 'pointer',
   background: color,
}))
