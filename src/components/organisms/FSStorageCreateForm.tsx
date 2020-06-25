import React, { useState } from 'react'
import {
  FormGroup,
  FormLabel,
  FormPrimaryButton,
  FormTextInput,
} from '../atoms/form'
import { useTranslation } from 'react-i18next'
import { useRouter } from '../../lib/router'
import { useDb } from '../../lib/db'
import { useToast } from '../../lib/toast'
import { useAnalytics, analyticsEvents } from '../../lib/analytics'

const FSStorageCreateForm = () => {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const { t } = useTranslation()
  const { push } = useRouter()
  const db = useDb()
  const { pushMessage } = useToast()
  const { report } = useAnalytics()
  const createStorageCallback = async () => {
    try {
      const storage = await db.createStorage(name)
      report(analyticsEvents.createStorage)
      push(`/app/storages/${storage.id}/notes`)
    } catch (error) {
      pushMessage({
        title: 'Something went wrong',
        description: error.toString(),
      })
    }
  }
  return (
    <>
      <FormGroup>
        <FormLabel>{t('storage.name')}</FormLabel>
        <FormTextInput
          type='text'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Location</FormLabel>
        <FormTextInput
          type='text'
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLocation(e.target.value)
          }}
        />
      </FormGroup>
      <FormGroup>
        <FormPrimaryButton onClick={createStorageCallback}>
          Create Storage
        </FormPrimaryButton>
      </FormGroup>
    </>
  )
}

export default FSStorageCreateForm