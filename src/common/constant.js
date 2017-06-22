
export const DATABASE_USER = 'admin'
export const DATABASE_PASSOWRD = 'admin'
export const DATABASE_URL = process.env.NODE_ENV === 'production'
    ? 'http://admin:admin@54.223.36.6:5984/portal'
    : 'http://admin:admin@192.168.31.116:5984/portal'
export const SAMPLE_TYPES = ['血浆', '白细胞', '切片', '蜡块', '组织']
export const INSTANCE_TYPE = ['dna', 'rna']
export const PATIENT_SEX = ['男', '女']
