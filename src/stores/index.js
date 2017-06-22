import LoginStore from './LoginStore'
import PatientStore from './PatientStore.js'
import PatientDetail from './PatientDetail'
import UserStore from './UserStore'
import SampleStore from './SampleStore.js'
import MutationStore from './MutationStore.js'

export default {
    PatientStore,
    MutationStore,
    SampleStore,
    loginStore: new LoginStore(),
    initPatientStore: new PatientStore(),
    patientDetail: new PatientDetail(),
    userStore: new UserStore(),
    sampleStore: new SampleStore()
}