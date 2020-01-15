pipeline {
    
	parameters {
        string(name: 'organisation', defaultValue: 'P2001960486trial_trial', description: 'org name to deploy app')
		string(name: 'space', defaultValue: 'qa', description: 'space name')
		}
	
    agent any
    
    stages {

	
        stage('Deploy-SCP') {
           steps {
		      echo "deploying on scp"
			  
			  cleanWs()
			  checkout scm

		  
			  withCredentials([usernamePassword(credentialsId: 'CF-devsecops20', passwordVariable: 'cfPassword', usernameVariable: 'cfUser')])
			    {
				    sh '''
                     cf login -a 'https://api.cf.eu10.hana.ondemand.com' -u ${cfUser} -p ${cfPassword} -o $organisation -s $space
					 cf push
					'''
				}

             }
        }
       
        
    }
    
}
