pipeline {
    
    agent any
    
    stages {

	    
        stage('Deploy-SCP') {
           steps {
		    cleanWs()
		    echo "deploying on scp"
			  checkout scm
			  
			  pushToCloudFoundry(
              target: 'https://api.cf.eu10.hana.ondemand.com',
              organization: 'P2001960486trial_trial',
              cloudSpace: 'dev',
              credentialsId: 'cf-scp',
			  manifestChoice: [manifestFile: 'manifest.yaml']
              )
            }
        }
    }
}
