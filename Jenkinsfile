pipeline {
    
    agent any
    
    stages {

	    
        stage('Deploy-PCF') {
           steps {
		              cleanWs()
		              echo "deploying on pcf"
			            checkout scm
			  
			             pushToCloudFoundry(
                      target: 'https://api.run.pivotal.io',
                      organization: 'CLOVE',
                      cloudSpace: 'development',
                      credentialsId: 'pcf_zia',
                      manifestChoice: [manifestFile: 'manifest.yaml']
                  )
            }
        }
    }
}
