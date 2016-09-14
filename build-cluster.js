//@auth
//@req(nodeGroup, path)

var envName = '${env.envName}'; 
var resp = jelastic.env.control.GetEnvInfo(envName, session);
return resp;
var nodes = resp.nodes, IPs = [];

for (var i = 0; i < nodes.length; i++) { 
  if (nodes[i].nodeGroup != nodeGroup) continue; 
  IPs.push(nodes[i].address + ':' + path);
} 

resp = [];
for (var i = 0; i < nodes.length; i++) { 
    if (nodes[i].nodeGroup != nodeGroup) continue; 
    resp.push(jelastic.env.control.SetDockerEnvVars(envName, session, nodes[i].id, '{"SERVERS":'+IPs.join(' ')+'}'));
}

return {
    result: 0,
    response: {a: 1, resp: resp}
}