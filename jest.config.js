module.exports = {
    roots: ['./server/api','./server/data','./server/auth','./server/images'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'node',
    globals:{
      'ts-jest':{
        tsConfig:{
          esModuleInterop: true,
        baseUrl:'./server/api/src'
        },
        
      }
    },
    
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}