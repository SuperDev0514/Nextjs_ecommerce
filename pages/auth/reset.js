import useState from 'react-usestateref'
import { useRouter } from 'next/router'
import { Button, Grid, useTheme, useToasts, Input, Text } from '@geist-ui/core'

import isEmail from '../../helpers/isEmail'
import Layout from '../../components/Layout'
import { themePreference } from '../../state/Theme'
import { forgotHandler, resetHandler } from '../../helpers/handlers'

import config from '../../main.config'

export default function () {
    const title = 'Reset Password'
    const description =
        'Reset your password using the verification code sent to your email address.'

    const theme = useTheme()
    const router = useRouter()
    const { setToast } = useToasts()

    const [loading, setLoading] = useState(false)
    const [nextStage, setNextStage] = useState(false)
    const [email, setEmail, refEmail] = useState('')
    const [code, setCode, refCode] = useState('')
    const [password, setPassword, refPassword] = useState('')

    return (
        <>
            <Layout
                config={config}
                themePreference={themePreference}
                crownLarge={title}
                crownSmall={description}
                metaTitle={title}
            >
                <Grid.Container gap={1}>
                    <Grid xs={24} md={12}>
                        <div style={{ display: 'block' }}>
                            <Input
                                label="email"
                                placeholder="Input your email."
                                width="100%"
                                value={email}
                                type={
                                    refEmail.current == ''
                                        ? 'default'
                                        : isEmail(refEmail.current)
                                        ? 'default'
                                        : 'error'
                                }
                                onChange={(e) => {
                                    setEmail(e.target.value.trim())
                                }}
                            />
                            {!refEmail.current == '' &&
                                !isEmail(refEmail.current) && (
                                    <Text small type="error">
                                        Incorrect email address!
                                    </Text>
                                )}
                            {!nextStage && (
                                <Button
                                    width="100%"
                                    mt={1}
                                    loading={loading}
                                    disabled={
                                        !refEmail.current ||
                                        !isEmail(refEmail.current)
                                    }
                                    type="secondary"
                                    onClick={(e) =>
                                        forgotHandler(
                                            config,
                                            refEmail,
                                            setLoading,
                                            setToast,
                                            setNextStage
                                        )
                                    }
                                >
                                    <b>SUBMIT EMAIL</b>
                                </Button>
                            )}
                            {nextStage && (
                                <>
                                    <Input
                                        width="100%"
                                        mb={0.5}
                                        label="code"
                                        placeholder="Input your verification code."
                                        type="secondary"
                                        value={code}
                                        onChange={(e) => {
                                            setCode(e.target.value.trim())
                                        }}
                                    />
                                    <Input
                                        width="100%"
                                        mb={0.5}
                                        label="password"
                                        placeholder="Input your new password."
                                        type={
                                            refPassword.current == ''
                                                ? 'default'
                                                : refPassword.current.length > 7
                                                ? 'default'
                                                : 'error'
                                        }
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim())
                                        }}
                                    />
                                    <Button
                                        width="100%"
                                        loading={loading}
                                        disabled={
                                            !refCode.current ||
                                            !refPassword.current ||
                                            refPassword.current.length < 8
                                        }
                                        type="secondary"
                                        onClick={(e) =>
                                            resetHandler(
                                                config,
                                                refCode,
                                                refPassword,
                                                setLoading,
                                                setToast,
                                                router
                                            )
                                        }
                                    >
                                        <b>SUBMIT NEW PASSWORD</b>
                                    </Button>
                                </>
                            )}
                        </div>
                    </Grid>
                </Grid.Container>
            </Layout>
        </>
    )
}
