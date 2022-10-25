import pandas as pd
import requests
from odyssey.models import IssueModel
open('dataset.csv', 'wb').write(r.content)
a=pd.read_csv('dataset.csv').to_numpy()
TOKEN = "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"
headers = { 'Accept': 'application/vnd.github+json', 'Authorization': 'Bearer '+TOKEN}
for i in range(0,33):
    repoInfo = a[i][0].split('/')
    response = requests.get('https://api.github.com/repos/{0}/{1}/issues/{2}'.format(repoInfo[3],repoInfo[4],repoInfo[6]), headers=headers)
    data = response.json()
    IssueModel.objects.get_or_create(issue=a[i][0],issueName = data['title'])